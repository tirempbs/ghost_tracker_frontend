function searchGiphy(string) {
    fetch(`http://api.giphy.com/v1/gifs/search?q=${string}&api_key=3z8UvhNbY64J20z8qW6UICnAvJQgEZbI&limit=5`)
        .then(resp => resp.json())
        .then(json => console.log(json))
}    