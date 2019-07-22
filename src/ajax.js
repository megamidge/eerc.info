export default class Ajax {
    static request(url, options) {
        return new AjaxPromise(GetResponse(url, options))
    }

    static send(url, options) {
        return GetResponse(url, options)
    }
}

class AjaxPromise {
    constructor(promise) {
        this.promise = promise
    }

    as(type) {
        return this.promise.then(response => {
            switch (type.toLowerCase()) {
                case 'json':
                    return response.json()

                case 'svg':
                    return new DOMParser().parseFromString(response.text(), "image/svg+xml")

                case 'html':
                    return new DOMParser().parseFromString(response.text(), "text/html")

                case 'document':
                case 'xml':
                    return new DOMParser().parseFromString(response.text(), "application/xml")

                case 'blob':
                case 'image':
                case 'jpeg':
                case 'jpg':
                case 'png':
                case 'bmp':
                case 'gif':
                    return response.blob()

                case 'text':
                    return response.text()

                default:
                    throw new Error(`${type} is not a valid response format`)
            }
        });
    }

    then(callback, error = null) {
        if (!error)
            return this.promise.then(callback)

        return this.promise.then(callback, error)
    }

    catch(callback) {
        return this.promise.catch(callback)
    }
}

function GetResponse(url, options) {
    const request = GetOptions(url, options)

    return fetch(request.url, request)
        .then(response => {
            if (!response.ok)
                throw response

            return response
        })
}

function GetOptions(url, options) {
    if (typeof options == 'undefined')
        return { url }

    const request = {
        cache: options.cache && options.cache.toLowerCase() || 'default',
        credentials: options.credentials && options.credentials.toLowerCase() || 'same-origin',
        method: options.method && options.method.toLowerCase() || 'get',
        redirect: options.redirect && options.redirect.toLowerCase() || 'follow',
        mode: options.mode && options.mode.toLowerCase() || undefined,
        headers: options.headers || {},
        body: options.body || undefined,
        url: options.url || url,
    }

    // append query string to url
    if (request.method === 'get' || request.method === 'head') {
        request.url = url + '?' + GetArgs(options);
        request.body = undefined
    }

    // post args if body empty
    else if (!request.body) {
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        request.body = GetArgs(options)
    }

    return request
}

function GetArgs(options) {
    if (!options || typeof options.args !== 'object')
        return ''

    return Object
        .keys(options.args)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(options.args[k]))
        .join('&')
}
