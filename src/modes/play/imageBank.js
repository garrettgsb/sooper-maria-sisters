export default class ImageBank {
  constructor() {
    this.cache = {};
  }

  get(path) {
    if (!this.cache[path]) {
      this.cache[path] = new Image();
      this.cache[path].src = path
    }
    return this.cache[path];
  }
}
