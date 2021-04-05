class Component {
    constructor(el) {
        this.components = [];
        this.el = el;
    }

    registerSubComponents(components = []) {
        components.forEach((Comp) => {
            const container = document.createElement('div');
            const component = new Comp(container);
            component.$parent = this;
            this.components.push(component);
        });
    }

    callHook(hook, ...payload) {
        this[hook] && this[hook](...payload);
    }

    $emit(event, ...payload) {
        this[event] && this[event](...payload);
        this.components.forEach((component) => component[event] && component[event](...payload));
    }
 
    render() {
        /** override */
        return '';
    }

    mount(el) {
        this.el = this.el === void 0 ? el : this.el;
        this.callHook('beforeComponentMount');
        this.el.innerHTML = this.render();
        this.callHook('componentDidMount', this);

        if (this.components.length > 0) {
            this.components.forEach((component) => {
                component.mount();
                this.el.appendChild(component.el);
            });
        }
    }
}