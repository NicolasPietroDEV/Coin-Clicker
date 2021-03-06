// Primeiramente, defino a variável mais importante, a grana
var dindin = 0;
// Aqui são algumas frescuras: não poder arrastar o dinheiro e não poder abrir o meno de contexto
document.getElementById("din").ondragstart = false;
document.oncontextmenu = function () {
  return false;
};
// Só um segredo do jogo: ao clicar no título voce pode alterá-lo
function namechanger() {
  document.querySelector(".titulo1").textContent =
    document.querySelector("#titlechanger").value;
  document.getElementById("secretchanger").style.display = "none";
}
function namechangerchanger() {
  document.getElementById("secretchanger").style.display = "block";
}
// Este já não é frescura, eu escondo o Dinheiro por Segundo até que o jogador tenha algum gerador.
document.getElementById("dpsall").style.display == "none";
// Crio a classe gerador, que dará inicio a cada uma das instancias que geram dinheiro, como a farmácia e seus atributos
class gerador {
  constructor(
    name,
    titlelabel,
    price,
    gain,
    raise,
    lvl,
    button,
    dpslabel,
    levellabel,
    inicial,
    progress,
    image,
    imagedir
  ) {
    this.name = name;
    this.titlelabel = titlelabel;
    this.price = price;
    this.gain = gain;
    this.lvl = lvl;
    this.raise = raise;
    this.button = button;
    this.dps = dpslabel;
    this.levellabel = levellabel;
    this.inicial = inicial;
    this.progress = progress;
    this.image = image;
    this.imagedir = imagedir;
  }
  // Como será necessário "upgradear", eu crio uma função que avança 1 level
  increase() {
    dindin = dindin - this.price;
    if (this.gain == 0) {
      this.gain = this.inicial;
      this.price = this.price * 2;
    } else {
      this.price = this.price * 2;
      this.gain = this.gain * this.raise;
    }
    this.lvl = this.lvl + 1;
    document.getElementById(this.button).textContent =
      this.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    document.getElementById(this.dps).textContent = this.gain.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
    document.getElementById("dinheiro").textContent = dindin.toLocaleString(
      "pt-BR",
      { style: "currency", currency: "BRL" }
    );
    document.getElementById(this.levellabel).textContent = this.lvl;
    document.getElementById(this.progress).style.display = "block";
    // Este será explicado mais para frente
    verify();
  }
}
// Crio então todas as instancias de gerador
var potenciaz = new gerador(
  "Aumentar potência",
  "po",
  10,
  5,
  1.3,
  1,
  "potencia",
  "dpc",
  "clicklevel",
  5,
  "po",
  false,
  false
);
var farmaciaz = new gerador(
  "Farmácia",
  "farmaciatitle",
  7500,
  0,
  1.3,
  0,
  "farmacia",
  "farmaciadps",
  "farmalevel",
  50,
  "progressfarma",
  "farmaciaimage",
  "assets/farmacia.jpg"
);
var acouguez = new gerador(
  "Açougue",
  "acouguetitle",
  20000,
  0,
  1.35,
  0,
  "acougue",
  "acouguedps",
  "acouguelevel",
  100,
  "progressacougue",
  "acougueimage",
  "assets/acougue.jpg"
);
var supermercadoz = new gerador(
  "Supermercado",
  "supermercadotitle",
  70000,
  0,
  1.4,
  0,
  "super",
  "superdps",
  "supermercadolevel",
  250,
  "progresssuper",
  "supermercadoimage",
  "assets/supermercado.jpg"
);
var shoppingz = new gerador(
  "Shopping",
  "shoppingtitle",
  200000,
  0,
  1.6,
  0,
  "shop",
  "shopdps",
  "shoppinglevel",
  500,
  "progressshop",
  "shoppingimage",
  "assets/shopping.jpeg"
);
// Variável que definirá meu ganho por segundo
var cps;
// Hackzinho pra debugar XD
function hack(dinheiro) {
  dindin = dindin + dinheiro;
}
// A função que será atribuida ao glorioso botão de ganhar dinheiro
function dinheiro() {
  dindin = dindin + potenciaz.gain;
  document.getElementById("dinheiro").textContent = dindin.toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  );
}
// Esta função será rodada a cada 10 milisegundos e desligará ou ligará os botões da tela conforme eu ter dinheiro
function verify() {
  cps = farmaciaz.gain + acouguez.gain + supermercadoz.gain + shoppingz.gain;
  for (i of [potenciaz, farmaciaz, acouguez, supermercadoz, shoppingz]) {
    if (dindin >= i.price) {
      document.getElementById(i.button).disabled = false;
      document.getElementById(i.titlelabel).textContent = i.name;
      if (i.image != false) {
        document.getElementById(i.image).src = i.imagedir;
        document.getElementById(i.image).style.opacity = 1;
      }
    } else {
      document.getElementById(i.button).disabled = true;
    }
  }
  if (cps > 0) {
    document.getElementById("dpsall").style.display = "block";
  }
  document.getElementById("sitename").textContent = dindin.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );
}
// Calcula e adiciona meu ganho por segundo a cada 1 segundo
function cps() {
  dindin = dindin + cps;
  document.getElementById("dinheiro").textContent = dindin.toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  );
  document.getElementById("dps").textContent = cps.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
// Seta os tempos das duas funções acima
setInterval(cps, 1000);
setInterval(verify, 10);
