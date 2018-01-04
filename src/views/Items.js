// src/views/Items

var m = require("mithril");
var Items = require('../models/Items')

module.exports = {
    oninit: Items.getItems,
    view: function( vnode ){
        return (
            <ul>
                {Items.items.map( function( item ){
                    return <li>{item.title}</li>
                })}
            </ul>
        )
    }
}
