import React from 'react';

class EventBus {
    constructor() {
        this.event = Object.create(null);
    };

    $on(name, fn) {
        if (!this.event[name]) {
            this.event[name] = [];
        }
        this.event[name].push(fn);
        return this;
    }
    $once(name, fn) {
        const _fn = (...args) => {
            this.$off(name, fn);
            fn.apply(this, args);
        };
        _fn.fn = fn; // 留存原fn用于$off时可以被找到
        this.$on(name, _fn);
        return this;
    }
    $off(name, fn) {
        if (!arguments.length) { // 没有参数时全部清空
            this.event = Object.create(null);
        } else if (!fn) {  // 只有事件名时清空当前事件名
            this.event[name] = [];
        } else {
            this.event[name] = this.event[name].filter(_fn => _fn !== fn || _fn.fn !== fn);
        }
        return this;
    }
    $emit(name, ...args) {
        this.event[name]?.forEach(fn => {
            fn.apply(this, args);
        });
        return this;
    }
};
React.Component.prototype.$bus = new EventBus();
