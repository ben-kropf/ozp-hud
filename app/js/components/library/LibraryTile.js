/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Sortable = require('../sortable/Sortable');
var Folder = require('../folder');
var LibraryActions = require('../../actions/Library');

var ActionMenu = React.createClass({
    componentDidUpdate: function(prevProps) {
        //if we are now a different listing, close the action menu
        if (prevProps.entry.listing.id !== this.props.entry.listing.id) {
            this.refs.checkbox.getDOMNode().checked = false;
        }
    },

    render: function() {
        var entry = this.props.entry,
            listing = entry.listing,
            removeBookmark = LibraryActions.removeFromLibrary.bind(null, entry),
            techSupportHref = CENTER_URL + '/#/home/quickview/' +
                encodeURIComponent(listing.id) + '/resources';

        /* jshint ignore:start */
        //use hidden checkbox to manage menu toggle state
        return (
            <label className="LibraryTile__actionMenu">
                <input ref="checkbox" type="checkbox" />
                <span className="LibraryTile__actionMenuButton" />
                <ul>
                    <li><a href="javascript:;" onClick={removeBookmark}>Remove Bookmark</a></li>
                    <li><a href={techSupportHref} target="_blank">Technical Support</a></li>
                </ul>
            </label>
        );
        /* jshint ignore:end */
    }
});

var LibraryTile = React.createClass({

    mixins: [ Sortable ],

    render: function() {
        var entry = this.props.entry,
            listing = entry.listing;


        /* jshint ignore:start */
        return (
            <li className="LibraryTile">
                <ActionMenu entry={entry} />
                <a href={listing.launchUrl} target="_blank">
                    <img className="LibraryTile__img" src={listing.imageLargeUrl} />
                </a>
                <h5>{listing.title}</h5>
            </li>
        );
        /* jshint ignore:end */
    }
});

module.exports = LibraryTile;
