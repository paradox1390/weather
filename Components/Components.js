export default class Components {
  constructor(element) {
    this.parentContainer = element;
  }
  containerComponents = this.createElement({ el: "div" });

  createElement(arr) {
    const element =
      arr.el === "fragment"
        ? document.createDocumentFragment()
        : document.createElement(arr.el);

    if (arr.atr?.length) {
      arr.atr.forEach((atribut) => {
        const nameAtr = Object.keys(atribut)[0];
        element[nameAtr] = atribut[nameAtr];
      });
    }
    if (arr.class?.length) {
      arr.class.forEach((className) => {
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
