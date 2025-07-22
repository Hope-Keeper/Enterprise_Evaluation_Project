fetch("/config.js")
    .then((response) => response.text())
    .then((scriptContent) => {
        eval(scriptContent); // Execute the script content
    })
    .then(() => {
        import("./renderApp").then(({ renderApp }) => renderApp());
    })
    .catch(() => {
        console.error("Failed to load config.js");
        import("./renderApp").then(({ renderApp }) => renderApp());
    });
