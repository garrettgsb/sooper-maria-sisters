class Audio {
  constructor(game) {
    this.game = game;
    this.playing = {};
    this.actx = new window.AudioContext();
  }

  fungusGet() {
    if (this.playing['fungusGet']) return;
    const tones = [
      698.46,
      1174.66,
      1046.50,
      1396.01,
    ];

    const interval = 0.1;
    const now = this.actx.currentTime;

    const osc = this.actx.createOscillator();
    const gain = this.actx.createGain();

    osc.type = 'sine';
    osc.connect(gain)
    gain.connect(this.actx.destination)

    tones.forEach((tone, index) => {
      osc.frequency.setValueAtTime(tone, now + (index * interval));
    });

    gain.gain.setValueAtTime(0.8, now);
    osc.start(now);
    this.playing['fungusGet'] = true;
    osc.onended = () => this.playing['fungusGet'] = false;
    osc.stop(now + (tones.length * interval))
  }

  ungrow() {
    const now = this.actx.currentTime;
    const osc = this.actx.createOscillator();
    const gain = this.actx.createGain();

    osc.type = 'sine';
    osc.connect(gain)
    gain.connect(this.actx.destination)
    gain.gain.setValueAtTime(0.4, now);
    osc.frequency.setValueAtTime(1174.66, now);
    osc.frequency.exponentialRampToValueAtTime(698.46, now + 0.2)
    gain.gain.linearRampToValueAtTime(0.0001, now + 0.2)
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playerDie() {
    const now = this.actx.currentTime;
    const osc = this.actx.createOscillator();
    const gain = this.actx.createGain();

    osc.type = 'square';
    osc.connect(gain)
    gain.connect(this.actx.destination)
    gain.gain.setValueAtTime(0.4, now);
    osc.frequency.setValueAtTime(87.31, now);
    gain.gain.setValueAtTime(0.0001, now + 0.05)
    gain.gain.setValueAtTime(0.4, now + 0.15)
    gain.gain.setValueAtTime(0.0001, now + 0.2)
    gain.gain.setValueAtTime(0.4, now + 0.25)
    osc.start(now);
    osc.stop(now + 0.3);
  }
}

export default Audio;
