"use strict";

// External dependencies.
var $ = require("jquery"),
    Backbone = require("backbone"),
    app = require("../app"),
    _ = require("underscore"),
    postsContentTemplate = _.template(require("../templates/mentions.html")),
    postTemplate = _.template(require("../templates/post.html")),
    PostModel = require("../models/Post"),
    UserModel = require("../models/User"),
    FeedModel = require("../models/Feed"),
    PostPreview = require("../views/PostPreview"),
    Twister = require("../Twister"),
    async = require("async");

Backbone.$ = $;

module.exports = Backbone.View.extend({

    isLoading: false,
    feed: null,
    $posts: null,
    $loader: null,

    events: {
        "click .post .icon": "openPost",
        "click .post .avatar": "openUser"
    },

    initialize: function(options) {
        var self = this;
        this.options = options;
        this.render();

        this.feed = new FeedModel();
        this.feed.get('users').add(app.user);
        this.feed.get('posts').on('add', function (post, posts, info) {
            self.$posts.append(postTemplate({post: post, icon: true}));
        });

        this.fetchMentions();

        $("#main-scrollable").scrollTop(0);
    },

    fetchMentions: function () {
        if (this.isLoading) return;
        var self = this;

        this.feed.fetchMentions(10, null, function (err, mentions) {
            if (err) return console.error('Error fetching posts in feed:', err);

            // View is removed while posts where fetched
            if (!self) return;

            self.$loader.hide();

            // Fetch avatars of users of which we don't have one yet
            self.feed.fetchAvatars(function (err, user, postsToSetAvatar) {
                if (!user.get('avatar')) {
                    return;
                }
                _.each(postsToSetAvatar, function (post) {
                    self.$posts.find('.post[data-id=' + post.cid + '] .left img').attr('src', user.get('avatar'));
                });
            });

            window.localStorage[app.user.get('username') + '_lastMention'] = mentions[0].get('time');
            app.dispatcher.trigger('mentions-seen');

            // Allowed to load the next page
            self.isLoading = false;
        });
    },

    openPost: function (e) {
        e.stopImmediatePropagation();
        var id = $(e.currentTarget).parents('.post').attr('data-id');
        var post = this.feed.get('posts').get(id);

        // Show original twist, not the retwist itself
        if (post.get('retwist')) {
            post = post.get('retwist');
        }

        app.dispatcher.trigger('open-post-detail', {
            post: post,
            feed: this.feed
        });
    },

    render: function() {
        this.$el.html(postsContentTemplate());
        this.$loader = this.$el.find('.load-animation');
        this.$posts = this.$el.find('.posts');
        return this;
    }
});
