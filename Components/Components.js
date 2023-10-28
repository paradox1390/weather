export default class Components {
  constructor(element) {
    this.parentContainer = element;
  }
  containerComponents = this.createElement({ el: "div" });

  createElement(obj) {
    const element =
      obj.el === "fragment"
        ? document.createDocumentFragment()
        : document.createElement(obj.el);

    if (obj.atr?.length) {
      obj.atr.forEach((atribut) => {
        const nameAtr = Object.keys(atribut)[0];
        element[nameAtr] = atribut[nameAtr];
      });
    }
    if (obj.class?.length) {
      obj.class.forEach((className) => {
        element.classList.add(className);
      });
    }
    return element;
  }
  render = () => {
    this.containerComponents.innerText =
      "This is the render method of the Components abstract class. Implement the render method in a child class";
    this.parentContainer.append(this.containerComponents);
  };
}
