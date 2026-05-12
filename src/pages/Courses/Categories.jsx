import { useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import PageWrapper from '../../components/layout/PageWrapper'
import Button from '../../components/common/Button'
import Table from '../../components/common/Table'
import Modal from '../../components/common/Modal'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchCategoriesThunk, fetchCoursesThunk, createCategoryThunk, updateCategoryThunk, deleteCategoryThunk } from '../../store/slices/courseSlice'

export default function Categories() {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.courses.categories)
  const courses = useAppSelector(state => state.courses.list)

  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [name, setName] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    dispatch(fetchCategoriesThunk())
    dispatch(fetchCoursesThunk())
  }, [dispatch])

  const openAdd = () => { setEditTarget(null); setName(''); setModalOpen(true) }
  const openEdit = (cat) => { setEditTarget(cat); setName(cat.name); setModalOpen(true) }

  const onSave = async () => {
    if (!name.trim()) return
    const result = editTarget
      ? await dispatch(updateCategoryThunk({ id: editTarget.id, data: { name: name.trim() } }))
      : await dispatch(createCategoryThunk({ name: name.trim() }))
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success(editTarget ? 'Category updated' : 'Category added')
      setModalOpen(false)
    } else {
      toast.error('Save failed')
    }
  }

  const confirmDelete = async () => {
    const result = await dispatch(deleteCategoryThunk(deleteTarget.id))
    if (result.meta.requestStatus === 'fulfilled') toast.success('Category deleted')
    else toast.error('Delete failed')
    setDeleteTarget(null)
  }

  const columns = [
    { header: '#', cell: (_, idx) => idx + 1 },
    { header: 'Category Name', accessor: 'name', cell: r => <span className="font-medium text-gray-900">{r.name}</span> },
    {
      header: 'Course Count',
      cell: r => {
        const count = courses.filter(c => c.category === r.id).length
        return <span className="text-gray-600">{count} course{count !== 1 ? 's' : ''}</span>
      }
    },
    {
      header: 'Actions',
      cell: r => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(r)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition"><Pencil className="h-4 w-4" /></button>
          <button onClick={() => setDeleteTarget(r)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"><Trash2 className="h-4 w-4" /></button>
        </div>
      )
    },
  ]

  return (
    <PageWrapper title="Course Categories">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">{categories.length} categories</p>
        <Button onClick={openAdd}>+ Add Category</Button>
      </div>
      <Table columns={columns} data={categories} />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Category' : 'Add Category'} size="sm">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Category Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. UG, PG, Diploma"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={onSave}>{editTarget ? 'Update' : 'Add'}</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirm Delete" size="sm">
        <p className="text-sm text-gray-600 mb-6">Delete category <strong>{deleteTarget?.name}</strong>?</p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </PageWrapper>
  )
}
