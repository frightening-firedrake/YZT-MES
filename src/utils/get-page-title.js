import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template'//这里才是真正修改document.title的地方啊

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
