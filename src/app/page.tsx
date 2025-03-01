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
  DialogTrigger,
} from '@/components/ui/dialog'
import markdownit from 'markdown-it'
import html2canvas from 'html2canvas'

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
        // 'code',
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

export default function Home() {
  const [value, setValue] = useState('')
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

  const pageWidth = useRef(1080 / 2)
  const [pageHeight, setPageHeight] = useState(1350 / 2)
  const [images, setImages] = useState<string[]>([])
  const sections = useRef<HTMLDivElement[]>([])
  useEffect(() => {
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
    console.log(element)
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
    document.body.removeChild(element)
  }, [value])

  function downloadPics() {
    const contents = document.getElementsByClassName('prose-xl')
    console.log(contents)
    const uuid = uuidv4()
    Array.from(contents).forEach((content, index) => {
      const element = content as HTMLElement

      // Use html2canvas to convert the element into a canvas
      html2canvas(element).then((canvas) => {
        // Convert the canvas to a data URL
        const imgData = canvas.toDataURL('image/png')

        // Create a temporary link element to trigger a download
        const link = document.createElement('a')
        link.href = imgData
        link.download = `${uuid}-${index + 1}.png`
        // Automatically click the link to trigger the download
        link.click()
      })
    })
  }

  return (
    <div className="flex h-full flex-col text-xl  leading-[1.7] w600:text-lg w400:text-base">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
        <Dialog>
          <DialogTrigger asChild>
            <Button size={'lg'} className={'text-lg'}>
              预览
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>确认效果</DialogTitle>
            </DialogHeader>
            <div>背景颜色</div>
            <div className="flex overflow-x-scroll  pb-4">
              {sections.current.map((it, index) => (
                <div className="prose-xl mr-4" key={index}>
                  <div
                    className={'h-full overflow-hidden bg-white p-2 px-4'}
                    style={{
                      width: pageWidth.current + 'px',
                    }}
                    dangerouslySetInnerHTML={{ __html: it.innerHTML }}
                  ></div>
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
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
