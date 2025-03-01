'use client'
import { IconType, SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import markdownit from 'markdown-it'
import html2canvas from 'html2canvas'
import { Spinner } from '@/components/ui/spiner'
import BackgroundPicker from '@/components/background_picker'

const md = markdownit({
  typographer: true,
  breaks: true,
  html: true,
})

// @ts-ignore
md.configure({
  components: {
    core: {
      rules: [
        'block',
        'inline',
        // 'references',
        'replacements',
        'linkify',
        'smartquotes',
        // 'footnote_tail'
      ],
    },
    block: {
      rules: [
        'blockquote',
        'code',
        // 'fences',
        'heading',
        //'hr',
        'lheading',
        // 'list',
        'paragraph',
        'table',
      ],
    },
    inline: {
      rules: [
        // 'autolink',
        // 'backticks',
        // 'del',
        'emphasis',
        // 'entity',
        // 'escape',
        // 'footnote_ref',
        // 'htmltag',
        'newline',
        // 'text'
      ],
    },
  },
})
const defaultText = `
# 触碰

十二岁的李错躺在半山腰的草地上。

夏天夜晚的风吹过这座小山，在月光下，田野中的雏菊随风摇曳，远处的城市里的灯光正在在逐渐熄灭。静静的夜里，种种虫鸣此起彼伏。闪烁的星光和深邃的夜空中漂浮的寥寥的云。

李错凝视着夜空，那璀璨的星星如同深海里流淌的河流。

远处，郊区的重工业工厂灯火通明，低沉的机器的运作声正逐渐开始显现。

在21世纪的夜晚里，人类的工业已经成为了新的宇宙背景辐射，在寂静的夜中代替虫鸣成为了新的底色。

李错想到，就和她在历史课中学到的那样，正如同人类之间的战争一样，野草和麦田争夺着荒野的边界。

她仰望星空，来自无数星星的光，穿越了千百光年的距离，点亮了地球的夜空。

她不禁想到星空就像一面巨大的黑色的镜子，当来自无数星球反射的光照进她的瞳孔中时，此刻的她也成为永远旅行在宇宙中的光一部分。

一股无来由的欣喜出现，她的嘴角不禁扬起。那是一种无比深切的幸福感和坚定感，李错突然想到，这意味着，自己所作的一切都将被宇宙所注视着，成为几万或几亿年后人类生活的一部分点亮其他人的夜空。

她就这样幸福地凝视着夜空，直到睡去。

在银河之外，不知道多远的地方，一股庞大的信息流正在涌动着。

在无数星系百亿年的照耀下，这股信息，从初始开始纠缠的一两个比特，变成了逐步形成的耗散结构，他吞噬着行星向恒星的坠落，无数恒星系和其上存在的毁灭与新生，吞噬着黑洞向着虚空发出的引力的扰动。

在突如其来的一刻，宇宙中无形中闪烁着的无数光点暗淡了少许，便又重新恢复了自己的光彩。

在一片混沌的荒野中，年醒了过来。

作为一个新生的生命，一个信息层面上的低熵体，他扫视着广袤无垠的宇宙。在时间线上行进着的无数光锥之中，他肆意的捕食着各种各样的信息。

可在宇宙之中，无论是静静燃烧着的恒星或是各种各样的奇异天体，其结构都是简单而稳定的。如果为太阳写一本日记，那么这本日记上百分之九十九的日子里都将只有一个字，烧。

以信息为食的年在这样简单而荒芜的宇宙中感到无比的饥饿，他在时间线和空间中不停的穿梭着，不断膨胀着的宇宙在时间线上就如同从虚空海洋奔向海面的一连串气泡，在绝大多数气泡中，年都找寻不到食物。可存活的本能却驱使着他不断的奔跑着。

夏日的太阳晒在小城里的河上，身着短袖短裤的人群聚集在河岸上，一边遥望着远处，一边三三两两交谈着，突然人群之中爆发了一声欢呼，一个跑者出现在了地平线上。

日食

墒增不是过程，而是结果





信息构成的巨兽

那是由一亿亿个发光的光点组成的巨型的生物。`
export default function Home() {
  const [value, setValue] = useState(defaultText)
  const links: { icon: IconType; href: string }[] = [
    {
      icon: SiGithub,
      href: 'https://github.com/haodong-ju',
    },
    {
      icon: SiLinkedin,
      href: 'https://www.linkedin.com/in/haodong-ju/',
    },
  ]
  const [backgroundStyle, setBackgroundStyle] = useState<string>('#ffffff') // Default background style

  const pageWidth = useRef(1080 / 2)
  const [pageHeight, setPageHeight] = useState(1350 / 2)
  const [images, setImages] = useState<string[]>([])
  const sections = useRef<HTMLDivElement[]>([])
  useEffect(() => {}, [value, pageHeight])

  function downloadPics() {
    const contents = document.getElementsByClassName('prose-xl')
    const uuid = uuidv4()

    images.forEach((content, index) => {
      // Use html2canvas to convert the element into a canvas

      // Create a temporary link element to trigger a download
      const link = document.createElement('a')
      link.href = content
      link.download = `${uuid}-${index + 1}.png`
      // Automatically click the link to trigger the download
      link.click()
    })
  }

  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  function setBackgroundStyleAndRefreshImg(style) {
    setBackgroundStyle(style)
  }

  useEffect(() => {
    if(dialog){
      refreshImage()
    }

  }, [backgroundStyle,dialog])

  async function refreshImage() {
    const html = md.render(value)
    const element = document.createElement('div')
    element.innerHTML = html
    element.style.width = pageWidth.current + 'px'
    element.style.position = 'absolute'
    element.style.height = '100vh'
    element.style.overflowY = 'hidden'
    element.style.left = '-9999px'
    element.className = 'prose-2xl'
    document.body.appendChild(element)
    const tmp: HTMLDivElement[] = []
    let currentHeight = 0
    Array.from(element.children).forEach((child) => {
      const childEl = child as HTMLDivElement
      const childHeight = childEl.offsetHeight
      if (currentHeight + childHeight > pageHeight - 48) {
        // 开始新的一页
        tmp.push(document.createElement('div'))
        currentHeight = 0
      }

      // 添加到当前 section
      const lastSection = tmp[tmp.length - 1] || document.createElement('div')
      lastSection.appendChild(childEl.cloneNode(true))
      currentHeight += childHeight

      if (!tmp.includes(lastSection)) {
        tmp.push(lastSection)
      }
    })
    sections.current = tmp
    element.innerHTML = ''
    sections.current.forEach((it) => {
      const newNode = document.createElement('div')
      newNode.appendChild(it)
      newNode.style.width = pageWidth.current + 'px'
      newNode.style.height = pageHeight + 'px'
      newNode.style.padding = '16px'
      newNode.style.background = backgroundStyle
      newNode.className = 'text-black p-2 px-4 prose-xl'
      element.appendChild(newNode)
    })

    const contents = document.getElementsByClassName('prose-xl')
    const temp = []
    for (const content of Array.from(contents)) {
      const element = content as HTMLElement
      const image = (await html2canvas(element)).toDataURL('image/png')
      temp.push(image)
    }
    setImages(temp)
    document.body.removeChild(element)
  }

  async function openPreview() {
    setLoading(true)
    setDialog(true)
    await refreshImage()
    setLoading(false)
  }

  return (
    <div className="flex h-full flex-col text-xl  leading-[1.7] w600:text-lg w400:text-base">
      <Textarea
        value={value}
        onInput={(e) => setValue(e.currentTarget.value)}
        className="flex-grow"
        rows={20}
        style={{
          borderRadius: 0,
          resize: 'none',
        }}
        placeholder="输入或者粘贴您的markdown内容。"
      />
      <div className="mr-auto flex w-full items-center gap-10 p-6">
        {links.map((link, id) => {
          return (
            <a target="_blank" key={id} href={link.href}>
              <link.icon title="" />
            </a>
          )
        })}
        <div className="flex-grow"></div>
        <Button
          disabled={!value}
          onClick={(e) => openPreview()}
          size={'lg'}
          className={'text-lg'}
        >
          预览
        </Button>
        <Dialog open={dialog} onOpenChange={setDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>确认效果</DialogTitle>
            </DialogHeader>
            {loading ? (
              <Spinner></Spinner>
            ) : (
              <>
                <BackgroundPicker
                  onBackgroundSelect={(background) =>
                    setBackgroundStyleAndRefreshImg(background)
                  }
                />
                <div className="flex overflow-x-auto  pb-4">
                  {images.map((it, index) => (
                    <div className="mr-4" key={index}>
                      <div
                        className={'overflow-hidden bg-white'}
                        style={{
                          width: '300px',
                        }}
                      >
                        <img src={it} />
                      </div>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button
                    onClick={(e) => {
                      downloadPics()
                    }}
                  >
                    下载图片
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
