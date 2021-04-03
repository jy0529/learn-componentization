class Component {
    constructor() {
        this.plugins = [];
        this.el = null;
    }

    installPlugin(plugin) {
        this.plugins.push(plugin);
    }

    callHook(hook, ...payload) {
        this[hook] && this[hook](payload);
        this.plugins.forEach((plugin) => plugin[hook] && plugin[hook](payload));
    }

    _render() {
        const pluginsHTML = this.plugins.map((plugin) => {
            return plugin.render ? plugin.render(this) : plugin(this);
        }).reduce((acc, html) => (acc + html), '');

        return `
            ${this.render()}
            ${ pluginsHTML }
        `;
    }

    mount(el) {
        this.el = el;
        this.callHook('beforeComponentMount');
        el.innerHTML = this._render();
        this.plugins.forEach((plugin) => plugin.action(this));
        this.callHook('componentDidMount');
    }
}