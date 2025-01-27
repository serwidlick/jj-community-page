import type {FullCreator} from "../../lib/model/ContentTypes.ts";
import type {ModalSignal} from "../../lib/createModalSignal.ts";
import {type Component, For, Match, Show, Switch} from "solid-js";
import {Dialog} from "@kobalte/core/dialog";
import {getTextColor} from "../../lib/utils/textColors.ts";
import {AiOutlineClose} from "solid-icons/ai";
import {twMerge} from "tailwind-merge";
import {
  FaBrandsDiscord,
  FaBrandsInstagram,
  FaBrandsPatreon,
  FaBrandsReddit,
  FaBrandsTiktok,
  FaBrandsTwitch,
  FaBrandsTwitter,
  FaBrandsYoutube,
  FaSolidLink
} from "solid-icons/fa";
import {JJIcon} from "../common/JJIcons.tsx";

interface CreatorDialogProps {
  creator: FullCreator,
  modalSignal: ModalSignal,
  onJJStreamsClick?: () => void
}

export const CreatorDialog: Component<CreatorDialogProps> = (props) => {
  return (
    <Dialog open={props.modalSignal.isOpen()} onOpenChange={props.modalSignal.setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 bg-black/20 lg:p-16 p-2"/>
        <Dialog.Content
          class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl w-[calc(100vw_-_24px)] lg:w-[min(calc(100vw_-_16px),_386px)]">
          <Dialog.Title
            class="p-2 flex flex-row gap-4 rounded-t-2xl"
            style={{
              background: props.creator.style?.primaryColor ?? '#1E95EF',
              color: getTextColor(props.creator.style?.primaryColor ?? '#1E95EF')
            }}
          >
            <button class={'rounded-full hover:bg-accent-200/10 aspect-square'}
                    onClick={() => props.modalSignal.close()}>
              <AiOutlineClose size={24}/>
            </button>
            <div class={'flex flex-col'}>
              <p class={'text-xl font-bold'}>{props.creator.name}</p>
            </div>
          </Dialog.Title>
          <Show when={props.creator.links}>
            <div class={'p-4 flex items-center justify-center'}>
              <Links creator={props.creator} onJJStreamsClick={props.onJJStreamsClick}/>
            </div>
          </Show>
          <Show when={!props.creator.links}>
            <div class={'p-4 flex items-center justify-center'}>
              <p>No Links found</p>
            </div>
          </Show>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

interface LinksProps {
  creator: FullCreator,
  onJJStreamsClick?: () => void
}

export const Links: Component<LinksProps> = (props) => {
  const links = props.creator.links!


  const linkOrder = [
    'twitch',
    'youtube',
    'bluesky',
    'twitter',
    'tiktok',
    'instagram',
  ]

  const filteredLinks = links
    .filter(link => link.type)
    .filter(link => linkOrder.includes(link.type!))

  filteredLinks.sort((a, b) => {
    return linkOrder.indexOf(a.type!) - linkOrder.indexOf(b.type!)
  })

  const linkHoverColor = (type: string) => {
    switch (type) {
      case 'twitch':
        return 'hover:text-[#6441A4]'
      case 'youtube':
        return 'hover:text-[#FF0000]'
      case 'bluesky':
        return 'hover:text-[#1E95EF]'
      case 'twitter':
        return 'hover:text-[#1DA1F2]'
      case 'tiktok':
        return 'hover:text-[#69C9D0]'
      case 'instagram':
        return 'hover:text-[#E4405F]'
      default:
        return 'hover:text-[#000000]'
    }
  }
  const linkBGHoverColor = (type: string) => {
    switch (type) {
      case 'twitch':
        return 'hover:bg-[#6441A4]/10'
      case 'youtube':
        return 'hover:bg-[#FF0000]/10'
      case 'bluesky':
        return 'hover:bg-[#1E95EF]/10'
      case 'twitter':
        return 'hover:bg-[#1DA1F2]/10'
      case 'tiktok':
        return 'hover:bg-[#69C9D0]/10'
      case 'instagram':
        return 'hover:bg-[#E4405F]/10'
      default:
        return 'hover:bg-[#000000]/10'
    }
  }


  return (
    <div class={'flex flex-wrap gap-2'}>
      <For each={filteredLinks}>
        {
          link => (
            <a href={link.url}
               target="_blank"
               rel="noreferrer"
               class={twMerge("flex flex-col items-center justify-center hover:scale-105 transition-all rounded-full p-2",
                 linkHoverColor(link.type!),
                 linkBGHoverColor(link.type!),
               )}
            >
              <SocialMediaIcon type={link.type}/>
              <p class={'text-xxs'}>{link.name}</p>
            </a>
          )
        }
      </For>
      <Show when={props.onJJStreamsClick !== undefined}>
        <button
          class={twMerge("flex flex-col items-center justify-center hover:scale-105 transition-all rounded-full p-2",
            'hover:text-accent',
            'hover:bg-accent/10',
          )}
          onClick={props.onJJStreamsClick}
        >
          <JJIcon class={'h-6 w-6'}/>
          <p class={'text-xxs'}>More with {props.creator.name}</p>
        </button>
      </Show>
    </div>
  );
}


interface SocialMediaIconProps {
  type?: string // instagram, twitter, youtube, merch, discord, patreon, tiktok, facebook, snapchat, linkedin, reddit, twitch, other
  size?: number
}

const SocialMediaIcon: Component<SocialMediaIconProps> = (props) => {
  const size = props.size ?? 24
  return (
    <Switch fallback={<FaSolidLink/>}>
      <Match when={props.type === 'instagram'}>
        <FaBrandsInstagram size={size}/>
      </Match>
      <Match when={props.type === 'twitter'}>
        <FaBrandsTwitter size={size}/>
      </Match>
      <Match when={props.type === 'patreon'}>
        <FaBrandsPatreon size={size}/>
      </Match>
      <Match when={props.type === 'discord'}>
        <FaBrandsDiscord size={size}/>
      </Match>
      <Match when={props.type === 'reddit'}>
        <FaBrandsReddit size={size}/>
      </Match>
      <Match when={props.type === 'tiktok'}>
        <FaBrandsTiktok size={size}/>
      </Match>
      <Match when={props.type === 'youtube'}>
        <FaBrandsYoutube size={size}/>
      </Match>
      <Match when={props.type === 'twitch'}>
        <FaBrandsTwitch size={size}/>
      </Match>
    </Switch>
  );
}
