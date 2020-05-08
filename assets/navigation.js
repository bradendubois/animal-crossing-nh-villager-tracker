const storage = require("./storage").access();

function stackCorrection() {

    let stack = storage.get("navigation-stack");
    let limit = parseInt(storage.get("stack-size-limit"));
    if (limit < 0) {
        return;
    }
    
    if (stack.length > limit) {
        storage.set("navigation-stack", stack.slice(stack.length - limit));
    }

    if (storage.get("navigation-stack").length === 0) {
        // TODO - Disable relevant nav options
    }
}

module.exports = {
    
    push: (content) => {
        storage.set("selectedContent", content);
        let stack = storage.get("navigation-stack");
        stack.push(content)
        storage.set("navigation-stack", stack);
        stackCorrection();
    },

    pop: () => {
        let stack = storage.get("navigation-stack");  
        if (stack.length > 1) {
            stack.pop();
            let newPage = stack[stack.length-1];
            storage.set("selectedContent", newPage);
            storage.set("navigation-stack", stack);
            stackCorrection();
        }
    },

    clickSection: (id)  => {
        document.getElementById(id).click();
    }
}