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
const defaultText = ``
export default function Home() {
  const [value, setValue] = useState(defaultText)
  const links: { icon: IconType; href: string }[] = [
    {
      icon: SiGithub,
      href: 'https://github.com/juhaodong/markdown-image',
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

  async function paste() {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setValue(text)
      } else {
        alert('您的剪贴板是空的')
      }
    } catch (e) {}
  }

  useEffect(() => {
    if (dialog) {
      refreshImage()
    }
  }, [backgroundStyle, dialog])

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
        <div>
          <Button
            onClick={(e) => paste()}
            size={'lg'}
            className={'mr-4 bg-green-400 text-lg'}
          >
            黏贴
          </Button>
          <Button
            disabled={!value}
            onClick={(e) => openPreview()}
            size={'lg'}
            className={'text-lg'}
          >
            预览
          </Button>
        </div>

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
