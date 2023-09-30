import IconTerbaru from '../assets/images/icon_sort_terbaru.svg'
import IconTerlama from '../assets/images/icon_sort_terlama.svg'
import IconSortingAZ from '../assets/images/icon_abjad_first.svg'
import IconSortingZA from '../assets/images/icon_abjad_last.svg'
import IconSortingBelumSelesai from '../assets/images/icon_sort_belum_Selesai.svg'



const dropdownSorting = [
    {
        id:1,
        title:"terbaru",
        type:'terbaru',
        icon:IconTerbaru
    },
    {
        id:2,
        title:"terlama",
        type:'terlama',
        icon:IconTerlama
    },
    {
        id:3,
        title:"A-Z",
        type:'A-Z',
        icon:IconSortingAZ
    },
    {
        id:4,
        title:"Z-A",
        type:'Z-A',
        icon:IconSortingZA
    },
    {
        id:5,
        title:"belum selesai",
        type:'belum selesai',
        icon:IconSortingBelumSelesai
    },
]

export default dropdownSorting;