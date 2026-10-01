(function(){
var $=function(i){return document.getElementById(i)};
var P={
cons:{rate:22,smin:300000,smax:5000000,sstep:100000,sdef:1500000,tmin:6,tmax:60,tdef:24},
mort:{rate:12,smin:5000000,smax:50000000,sstep:500000,sdef:20000000,tmin:60,tmax:300,tdef:180},
auto:{rate:18,smin:2000000,smax:20000000,sstep:250000,sdef:8000000,tmin:12,tmax:84,tdef:48},
onl:{rate:28,smin:30000,smax:500000,sstep:10000,sdef:150000,tmin:3,tmax:12,tdef:6}};
function fmt(n){return Math.round(n).toLocaleString("ru-RU")+" ₸"}
function mon(m){var y=Math.floor(m/12),r=m%12;return (y?y+" жыл ":"")+(r?r+" ай":"")}
function setup(){
  var p=P[$("cp").value],s=$("cs"),t=$("ct");
  s.min=p.smin;s.max=p.smax;s.step=p.sstep;s.value=p.sdef;
  t.min=p.tmin;t.max=p.tmax;t.step=1;t.value=p.tdef;
  calc();
}
function calc(){
  var p=P[$("cp").value],S=+$("cs").value,n=+$("ct").value,r=p.rate/1200;
  var m=S*r/(1-Math.pow(1+r,-n)),tot=m*n;
  $("csv").textContent=fmt(S);$("ctv").textContent=mon(n);
  $("crate").textContent="Мөлшерлеме (демо): жылдық "+p.rate+"%";
  $("rm").textContent=fmt(m);$("rt").textContent=fmt(tot);$("ro").textContent=fmt(tot-S);
}
$("cp").addEventListener("change",setup);
$("cs").addEventListener("input",calc);$("ct").addEventListener("input",calc);
setup();
$("lead").addEventListener("submit",function(e){
  e.preventDefault();$("fok").textContent="";
  var n=$("fn").value.trim(),p=$("fp").value.replace(/[^\d+]/g,"");
  if(n.length<2){$("ferr").textContent="Аты-жөніңізді енгізіңіз.";return}
  if(p.replace("+","").length<10){$("ferr").textContent="Телефон нөмірін толық енгізіңіз (кемінде 10 сан).";return}
  $("ferr").textContent="";
  $("fok").textContent="Рақмет, "+n+"! Өтінім қабылданды, менеджер хабарласады.";
  $("lead").reset();
});
})();
