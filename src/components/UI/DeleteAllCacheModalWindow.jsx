import { Modal } from "antd"

const DeleteAllCacheModalWindow = ({ setModalOpen, modalOpen }) => {
  const deleteCache = () => {
    deleteAllCache()
    setModalOpen(false)
  }
  const hideModal = () => {
    setModalOpen(false)
  }

  function deleteAllCache() {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <Modal
        style={{
          textAlign: "center",
        }}
        title='Подтверждение'
        closable={false}
        open={modalOpen}
        onOk={deleteCache}
        onCancel={hideModal}
        okText='Подтвердить удаление'
        cancelText='Отменить'>
        <p>
          Вы действительно хотите удалить список дел и их историю? Это действие
          невозможно отменить.
        </p>
      </Modal>
    </>
  )
}

export default DeleteAllCacheModalWindow
