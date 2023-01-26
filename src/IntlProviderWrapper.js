import Persion from './data/ir.json'
import English from './data/en.json'
import { createContext, useState } from 'react'
import { IntlProvider } from 'react-intl'

export const langContext = createContext()

const IntlProviderWrapper = (props) => {

    if (!window.localStorage.getItem("language")) {
        window.localStorage.setItem("language", "fa")
    }

    const menuMessages = {
        en: { ...English },
        fa: { ...Persion }
    }

    const [locale, setLocal] = useState(window.localStorage.getItem("language"))
    const [message, setMessage] = useState(menuMessages[locale])
    const handleChange = (e) => {
        if (e === "en") {
            setMessage(English)
            setLocal("en")
            window.localStorage.setItem("language", "en")
        }
        else {
            setMessage(Persion)
            setLocal("fa")
            window.localStorage.setItem("language", "fa")

        }
    }
    return (
        <langContext.Provider value={{ handleChange, locale }}>
            <IntlProvider locale={locale} messages={message}>
                {props.children}
            </IntlProvider>
        </langContext.Provider>
    )
}
export default IntlProviderWrapper