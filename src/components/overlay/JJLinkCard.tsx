import {type Component, Match, Switch} from 'solid-js'

interface JJLinkProps {
  theme: string
  url: string
}

export const JJLink: Component<JJLinkProps> = props => {
  const background = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
      case 'blue':
        return 'bg-white'
      default:
        return 'bg-primary-500'
    }
  }
  const link = () => {
    switch (props.theme) {
      case 'pink':
      case 'red':
        return 'text-primary'
      case 'blue':
        return 'text-accent'
      default:
        return 'text-white'
    }
  }
  return (
    <div class={`${background()} flex h-full w-full flex-col items-center justify-center rounded-2xl p-2 shadow-2xl`}>
      <Switch>
        <Match when={props.url === 'jinglejam.tiltify.com'}>
          <p class={`text-xl font-bold ${link()}`}>{props.url}</p>
        </Match>
        <Match when={props.url !== 'jinglejam.tiltify.com'}>
          <p class={`text-sm font-bold ${link()}`}>{props.url}</p>
        </Match>
      </Switch>
    </div>
  )
}
