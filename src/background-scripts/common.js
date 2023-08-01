var TextToLookFor = [
    'account',
    'address',
    'card',
    'code',
    'credit card',
    'cvc',
    'cvv',
    'email',
    'login',
    'password',
    'phone number',
    'phone',
    'security',
    'social security',
    'ssn',
    'user name',
    'username',
];
var CheckIntervalInMilliseconds = 1000;
var MaxAttempts = 10;
var PopperInstances = [];

function createSensitivePopper(targetElement, text, placement = 'right') {
    const existingPopperIndex = PopperInstances.findIndex(
        (inst) => inst.reference == targetElement
    );
    const existingPopper = PopperInstances[existingPopperIndex];
    if (!existingPopper || (existingPopper && !existingPopper.state.permanentlyDeleted)) {
        const popover = $(
            `<div class="popper">${text}<div class="popper__arrow" x-arrow></div></div>`
        );
        $('body').append(popover);
        const popperInstance = new Popper(targetElement, popover[0], {
            placement,
            removeOnDestroy: true,
        });
        if (!existingPopper) {
            PopperInstances.push(popperInstance);
        } else {
            PopperInstances[existingPopperIndex] = popperInstance;
        }
        popover.click(() => {
            popperInstance.destroy();
            popperInstance.state.permanentlyDeleted = true;
        });
    }
}

function destroyAllPoppers() {
    PopperInstances.forEach((inst) => {
        inst && !inst.state.isDestroyed && inst.destroy();
    });
}
