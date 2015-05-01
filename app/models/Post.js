"use strict";

// External dependencies.
var $ = require("jquery"),
    Backbone = require("backbone"),
    app = require("../app"),
    moment = require("moment");

Backbone.$ = $;

// Defining the application router.
var PostModel = module.exports = Backbone.Model.extend({
    defaults: {
        twister_id: null,
        message: null,
        time: null,
        user: null,
        retwist: null
    },

    /**
     * data = Twister post data
     * users = user collection to retrieve users from
     */
    parse: function (item, users) {
        var retwist;
        if(item.rt) {
            var retwistUser = users.findWhere({username: item.rt.n});

            // If this is a retwist we might not know the user
            // in that case add it to the list of users
            if (!retwistUser) {
                retwistUser = users.newUser({username: item.rt.n, following: false});
            }

            // Build the retwist post model
            retwist = new PostModel({
                user: retwistUser,
                message: item.rt.msg,
                time: item.rt.time,
                twister_id: item.rt.k
            });
        }

        var user = users.findWhere({username: item.n});

        // Maybe the user doens't excist yet when we are parsing a 
        // parent post of a reply for example
        if (!user) {
            user = users.newUser({username: item.n, following: false});
        }

        this.set({
            id: user + '_' + item.k,
            user: user,
            message: item.msg,
            time: item.time,
            retwist: retwist,
            reply: item.reply ? {username: item.reply.n, twister_id: item.reply.k} : undefined,
            twister_id: item.k,
            last_twister_id: item.lastk
        });

        user.addPost(this);

        return this;
    },

    getMessageRegexed: function () {
        if (!this.get('message')) return "";
        var msg = this.get('message').replace( /(https?:\/\/[^\s]+)/g, function(url) { return '<a href="'+url+'">'+url+'</a>' });
        msg = msg.replace( /(^|[^#\w])#(\w{1,15})\b/g, '$1<a href="hashtag/$2">#$2</a>' );
        msg = msg.replace( /(^|[^@\w])@(\w{1,15})\b/g, '$1<a class="username" href="user/$2">$2</a>' );
        return msg;
    },

    getTimeAgo: function ()
    {
        return moment(this.get('time') * 1000).fromNow();
    }
});
