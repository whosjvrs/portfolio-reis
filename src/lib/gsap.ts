import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Registro único dos plugins; componentes importam daqui
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText)

// A Recoleta chega depois do primeiro layout e muda alturas; remede os gatilhos
void document.fonts.ready.then(() => ScrollTrigger.refresh())

export { gsap, ScrollTrigger, SplitText, useGSAP }
