class ChaoGPT {
  constructor() {
    this.$USER_INPUT = document.getElementById('user-input');
    this.$CHAO_OUTPUT = document.getElementById('chao-output');
    this.$CHAO_OUTPUT.innerText = 'CHAO: Let\'s communicate with ChaoGPT!\n';
    this.modes = { Chao: 'Chao', ILYGame: 'ILYGame' };
    this.changeMode(this.modes.Chao);
  }

  changeMode(mode) {
    this.current_mode = mode;
    if (mode == this.modes.ILYGame) {
      this.ily_count = 0;
      console.log('--- I love you game mode ---')
      this.$CHAO_OUTPUT.innerText += 'CHAO: Let\'s play "愛してるゲーム"！\n';
      this.$CHAO_OUTPUT.innerText += 'CHAO: 愛してる \n';
    } else if (mode == this.modes.Chao) {
      console.log('--- Chao mode ---')
      this.$CHAO_OUTPUT.innerText += 'CHAO: Let\'s say "Chao!" to each other! \n';
      this.$CHAO_OUTPUT.innerText += 'CHAO: Chao! \n';
    }
    console.log(this.$CHAO_OUTPUT.innerText);
  }

  checkChangeMode() {
    const CHANGE_TO_ILY_CONDITION = 'ILY Mode';
    const CHANGE_TO_CHAO_CONDITION = 'Chao Mode';
    const USER_INPUT = this.$USER_INPUT.value;

    if (USER_INPUT.match(CHANGE_TO_ILY_CONDITION)) { this.changeMode(this.modes.ILYGame); return true }
    else if (USER_INPUT.match(CHANGE_TO_CHAO_CONDITION)) { this.changeMode(this.modes.Chao); return true }
    else { return false; }
  }

  communicate() {
    this.$CHAO_OUTPUT.innerText += `USER: ${this.$USER_INPUT.value} \n`;
    if (this.checkChangeMode()) return;
    if (this.current_mode == this.modes.ILYGame) {
      this.$CHAO_OUTPUT.innerText = `CHAO: ${this.ILYGame()} \n`;
    } else if (this.current_mode == this.modes.Chao) {
      this.$CHAO_OUTPUT.innerText = `CHAO: ${this.SayChao()} \n`;
    }
    console.log(this.$CHAO_OUTPUT.innerText);
  }

  ILYGame() {
    const USER_INPUT = this.$USER_INPUT.value;
    const LAUGH_CONDITION = '.*[w|W|笑]+';
    let output = '';

    if (USER_INPUT == '愛してる') {
      this.ily_count ++;
      output = '愛してる';
      return '愛してる';
    } else if (USER_INPUT.match(LAUGH_CONDITION)) {
      output = `You laughed! You lose! Record: ${this.ily_count}`;
      this.ily_count = 0;
    } else {
      output = `You said something else! You lose! Record: ${this.ily_count}`;
      this.ily_count = 0;
    }
    return output;
  }

  SayChao() {
    const USER_INPUT = this.$USER_INPUT.value;
    const CHAO_CONDITION = '.*(C|c)ha*o*.*';
    const CIAO_CONDITION = '.*(C|c)ia*o*.*';
    const ADIOS_CONDITION = '.*(A|a)dio*s*.*';
    let output = '';

    if (USER_INPUT.match(CHAO_CONDITION)) {
      output = 'Chao! user!';
    } else if (USER_INPUT.match(CIAO_CONDITION)) {
      output = 'Ciao... user...';
    } else if (USER_INPUT.match(ADIOS_CONDITION)) {
      output = 'Oh... Adios.....';
    } else {
      output = 'Sorry, I can\'t understand it.';
    }

    return output;
  }
}

const CHAO_GPT = new ChaoGPT();
document.getElementById('say').addEventListener('click', function() {
  console.log(`USER: ${CHAO_GPT.$USER_INPUT.value}`);
  CHAO_GPT.communicate();
});

