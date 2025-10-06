import { displayCategories, displayVideos } from "./main.js";

export function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(
            (response) => response.json()
        )
    .then(
        (data) => displayCategories(data.categories)
    );
}

export function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then(data => displayVideos(data.videos));
}
