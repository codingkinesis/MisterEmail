function createEventEmitter() {
    const listenerMap = {}

    return {
        on(evName, listener) {
            listenerMap[evName] = (listenerMap[evName]) ? [...listenerMap[evName], listener] : [listener]
            return () => {
                listenerMap[evName] = listenerMap[evName].filter(func => func !== listener)
            }
        },

        emit(evName, data) {
            if (!listenerMap[evName]) return
            listenerMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBusService = createEventEmitter()

export function showSuccessMsg(txt) {
    showUserMsg({ txt, type: 'success'})
}

export function showErrorMsg(txt) {
    showUserMsg({ txt, type: 'error'})
}

function showUserMsg(msg) {
    eventBusService.emit('show-user-msg', msg)
}
