document.body.addEventListener('click', clickHandler);

function clickHandler(event) {

    event.preventDefault();

    if (!event.target.hasAttribute('data-editable')) return;
    console.log('hello');

    let targetElement = event.target;
    let parentElement = targetElement.parentNode;
    let type = targetElement.getAttribute('data-editable');
    console.log('type', type);

    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', type);
    parentElement.appendChild(inputElement);
    inputElement.value = targetElement.innerText;
    inputElement.classList.add('form-control');

    let buttonOk = createButton('btn-primary', 'glyphicon-ok', inputElement, targetElement);
    let buttonCancel = createButton('btn-danger', 'glyphicon-remove', inputElement, targetElement);
    parentElement.appendChild(buttonOk);
    parentElement.appendChild(buttonCancel);

    parentElement.removeChild(targetElement);

    // inputElement.focus();
    inputElement.select();

    // inputElement.addEventListener('blur', function (event) {
    //     parentElement.appendChild(targetElement);
    //     parentElement.removeChild(inputElement);
    // });

    inputElement.addEventListener('keyup', function (event) {
        // console.log(event);
        switch (event.which) {
            case 13:
                targetElement.innerText = inputElement.value;
                inputElement.blur();
                break; //save
            case 27:
                // parentElement.appendChild(targetElement);
                // parentElement.removeChild(inputElement);
                inputElement.blur();
                break; //cancel
        }
    });
} 

function createIcon(iconName) {
    let iconElement = document.createElement('span');
    iconElement.setAttribute('aria-hidden', true);
    let iconClasses = ["glyphicon", iconName];
    iconElement.classList.add(...iconClasses);
    return iconElement;   
}

function createButton(btnColorClass, iconName, inputElement, targetElement) {
    let btnElement = document.createElement('button');
    btnElement.setAttribute('type', 'button');
    let btnClasses = ["btn", btnColorClass];
    btnElement.classList.add(...btnClasses); 

    let spanEl = createIcon(iconName);
    btnElement.appendChild(spanEl);

    btnElement.addEventListener('click', function(event) {

        if (event.target.classList[1] === 'glyphicon-ok') {
            targetElement.innerText = inputElement.value;
            inputElement.parentNode.appendChild(targetElement);

        } else {
            inputElement.parentNode.appendChild(targetElement);
        }
        let buttons = inputElement.parentNode.getElementsByClassName("btn");
        [...buttons].forEach(function(btn) {
            btn.remove();
        })
        inputElement.parentNode.removeChild(inputElement);
    });

    return btnElement;
}