# wcl.js

This is my wonky attempt at providing the [Wellington City Libraries](http://wcl.govt.nz) user info as JSON!

Why? It's a fun challenge! I don't reaaaally need it but it's particularly annoying to scrape as is.

# What's the trouble?

Well, firstly they don't use https which speaks for itself. The site uses [JSP](https://en.wikipedia.org/wiki/JavaServer_Pages) which isn't an issue itself. It also uses iFrames which also isn't much trouble.

What is, is that account data isn't rendered to HTML but rather, you get HTML with your account data as an inline Javascript array.

For starters, this is a pain because you can't scrape using something like cURL since it's only applied to the DOM when open in your browser window.

Well, that's fine, we can just build the DOM using JSDOM except oh wait, it references a file which it can't build which ruins that.

This is what I've build so far to get around it all. I basically regex the inline script out of the fetched page and apply it to an empty DOM. JSDOM can then execute the script and I can regex some more until we've got a nice clean object.

It works™ but it's not perfect. I had a quick look at reverse engineering whatever they use to serve up data to their android app and I know roughly where it comes from but the URLs are obscured as hell plus it's mostly processed internally meaning you can't just spin up Wireshark and snag URLs.

Similarly, I decompiled the WCL Android app and the URLs are comprised of about 20 or 30 different segments which are all fairly obscured so yeah, one day I'll make something out of this if I can figure out a nice solution.

Also, fetching charges (checked out books) sometimes errors out with a status 500 for no great reason so that's a thing too.

# What's the next step?

You could probably cleanup some bits and add cookiejar support. Axios has an unofficial helper library [here](https://github.com/3846masa/axios-cookiejar-support).

This project has been pretty tiring and I'm ready to just put it on hold indefinitely. I learnt a bunch about JSDOM and cookies so that's cool but I'm probably way out of my depth to be honest. You're welcome to pair on it or submit PRs though.