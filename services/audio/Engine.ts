import { FeatureFlags } from '../flags';
import { AudioLibrary } from './library';

export class AudioEngine {
  private static context: AudioContext | null = null;
  private static ambientSource: AudioBufferSourceNode | null = null;
  private static ambientBuffer: AudioBuffer | null = null;
  private static isMuted: boolean = false;

  private static initContext() {
    if (typeof window === 'undefined') return;
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  static toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ambientSource) {
      this.ambientSource.stop();
      this.ambientSource = null;
    }
  }

  static async playSFX(type: 'click' | 'hover' | 'damage' | 'victory') {
    if (!FeatureFlags.enableAudioEngine || this.isMuted) return;
    try {
      this.initContext();
      if (!this.context) return;

      const path = AudioLibrary.sfx[type];
      const response = await fetch(path);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);

      const source = this.context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.context.destination);
      source.start(0);
    } catch {
      // Gracefully capture loading blocks
    }
  }

  static async playAmbient(themeId: keyof typeof AudioLibrary.ambient) {
    if (!FeatureFlags.enableAudioEngine || this.isMuted) return;
    try {
      this.initContext();
      if (!this.context) return;

      if (this.ambientSource) {
        this.ambientSource.stop();
        this.ambientSource = null;
      }

      const path = AudioLibrary.ambient[themeId];
      const response = await fetch(path);
      const arrayBuffer = await response.arrayBuffer();
      this.ambientBuffer = await this.context.decodeAudioData(arrayBuffer);

      this.ambientSource = this.context.createBufferSource();
      this.ambientSource.buffer = this.ambientBuffer;
      this.ambientSource.loop = true;
      this.ambientSource.connect(this.context.destination);
      this.ambientSource.start(0);
    } catch {
      // Capture gesture blockages gracefully
    }
  }

  static stopAmbient() {
    if (this.ambientSource) {
      this.ambientSource.stop();
      this.ambientSource = null;
    }
  }
}
