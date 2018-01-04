// src/views/Layout
var m = require("mithril");
var Items = require('../models/Items')

module.exports = {
    oninit: Items.getItems,
    view: function( vnode ){
        return (
            <div>
                <nav class="menu">
                    <a href="/list" oncreate={m.route.link}>Users</a>
                </nav>
                <section>{vnode.children}</section>
                <ul>
                    {Items.items.map( function( item ){
                        return <li>{item.title}</li>
                    })}
                </ul>
            </div>
        )
    }
}
