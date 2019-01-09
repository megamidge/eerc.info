export default class Ajax {
  static request(url, args) {
    // build request
    let request = Ajax._getRequest(args);

    // build URL
    let href;

    // append query string to url
    if (
      typeof request.method === "undefined" ||
      request.method === "get" ||
      request.method === "head"
    ) {
      href = url + "?" + Ajax._getArgs(args);
    }

    // use default url
    else {
      href = url;

      // use args as body instead if body not specified
      if (typeof request.body === "undefined") {
        if (typeof request.headers === "undefined") request.headers = {};

        request.headers["Content-Type"] = "application/x-www-form-urlencoded";
        request.body = Ajax._getArgs(args);
      }
    }

    // perform fetch request
    let promise = fetch(href, request).then(function(response) {
      // throw error if not successful
      if (!response.ok) throw response;

      return response;
    });

    promise.as = function(type) {
      return this.then(function(response) {
        switch (type.toLowerCase()) {
          case "json":
            return response.json();

          case "svg":
            return response.text().then(function(data) {
              return new DOMParser().parseFromString(data, "image/svg+xml");
            });

          case "html":
            return response.text().then(function(data) {
              return new DOMParser().parseFromString(
                response.text(),
                "text/html"
              );
            });

          case "document":
          case "xml":
            return response.text().then(function(data) {
              new DOMParser().parseFromString(
                stringContainingHTMLSource,
                "application/xml"
              );
            });

          case "blob":
          case "image":
          case "jpeg":
          case "jpg":
          case "png":
          case "bmp":
          case "gif":
            return response.blob();

          case "text":
          default:
            return response.text();
        }
      });
    };

    return promise;
  }

  static send(url, args) {
    // build URL
    let href = url + Ajax._getArgs(args);

    // build request
    let request = Ajax._getRequest(args);

    // override request method
    request.method = "post";

    // perform fetch request
    return fetch(href, request).then(function() {
      // throw error if not successful
      if (!(response.status >= 200 && response.status < 300))
        throw response.statusText;

      return response;
    });
  }

  static _getArgs(options) {
    if (typeof options == "undefined" || typeof options.args !== "object")
      return "";

    return Object.keys(options.args)
      .map(function(k) {
        return (
          encodeURIComponent(k) + "=" + encodeURIComponent(options.args[k])
        );
      })
      .join("&");
  }

  static _getRequest(options) {
    let request = {};

    // return empty request if no options given
    if (typeof options == "undefined") return request;

    // cache rule
    if (typeof options.cache !== "undefined")
      request.cache = options.cache.toLowerCase();

    // request method
    if (typeof options.method !== "undefined")
      request.method = options.method.toLowerCase();
    else request.method = "get";

    // request headers
    if (typeof options.headers !== "undefined")
      request.headers = options.headers;

    // message body
    if (typeof options.body !== "undefined") request.body = options.body;

    // cross origin policy
    if (typeof options.mode !== "undefined")
      request.mode = options.mode.toLowerCase();

    // send cookies and data
    if (typeof options.credentials !== "undefined")
      request.credentials = options.credentials.toLowerCase();

    // action on redirect
    if (typeof options.redirect !== "undefined")
      request.redirect = options.redirect.toLowerCase();

    return request;
  }
}
