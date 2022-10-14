import { ContactLists } from '../../redux/slices/contacts/types'

export type EditFormProps = {
  isOpenModal: boolean
  closeModal: () => void
  selectedContact: ContactLists | null
}

export type EditFormValues = {
  name: string
  phone: string
}
