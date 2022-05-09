import sweetalert from 'sweetalert2'

const Toast = sweetalert.mixin({
    toast: true,
    position: 'bottom-right',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', sweetalert.stopTimer)
        toast.addEventListener('mouseleave', sweetalert.resumeTimer)
    }
})

export function success(message) {
    Toast.fire({ icon: 'success', title: message })
}

export function error(message) {
    Toast.fire({ icon: 'error', title: message })
}

export function warning(message) {
    Toast.fire({ icon: 'warning', title: message })
}
