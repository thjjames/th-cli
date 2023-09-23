import React, { Component } from 'react';

class demo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const res = await this.$swagger.$get('/request').then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
        console.log('await:', res);
    }

    render() {
        return (
            <div className="m-20">
                <button
                    className="p-20"
                    onClick={
                        () => {
                            this.$swagger.$get('/request');
                        }
                    }
                >
                    Get
                </button>
                <button
                    className="p-20 ml-20"
                    onClick={
                        () => {
                            this.$swagger.$post('/request', { method: 'POST', url: 'https://getman.cn/echo' });
                        }
                    }
                >
                    Post
                </button>
            </div>
        );
    }
}
export default demo;