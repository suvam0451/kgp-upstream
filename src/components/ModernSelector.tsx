import { Select } from '@blueprintjs/select'

interface Filmy {
  id: string
}

let Irithyll: Filmy[] = [{ id: 'first' }, { id: 'second' }, { id: 'third' }]

const FilmSelect = Select.ofType<Filmy>()
// Typescript
// function ModernSelector() {
//   return <FilmSelect items={Irithyll}
// //   itemPredicate
//   onItemSelect={...}></FilmSelect>
// }
