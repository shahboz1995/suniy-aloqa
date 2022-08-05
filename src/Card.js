import { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import { toast } from 'react-toastify'

const Card = () => {
  const [mainCard, setMainCard] = useState([])
  const [card, setCard] = useState([])
  const [isModal, setIsModal] = useState(false)

  const addCartHanderler = (item) => {
    setCard((prev) => {
      return [...prev, item]
    })
    toast.dark('Product added successfully')
  }
  const modalHander = () => {
    setIsModal(!isModal)
  }

  useEffect(() => {
    alanBtn({
      key:
        'cb295259f8f14464596ab8212cc3a5d82e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'getMenu') {
          setMainCard(commandData.data)
        } else if (commandData.command === 'showCart') {
          addCartHanderler(commandData.data)
        } else if (commandData.command === 'opanCart') {
          setIsModal(commandData.data)
        } else if (commandData.command === 'closeCart') {
          setIsModal(commandData.data)
        }
      },
    })
  }, [])

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {mainCard.map((item) => (
            <div key={item.id} className="col">
              <div
                className="card shadaw-sm p-3"
                style={{ minHeight: '550px' }}
              >
                <div className="card-title">
                  <h4 className="text-muted text-center">Product #{item.id}</h4>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="bg-placeholder card-image-top"
                  width="100%"
                  height="400px"
                />
                <div className="card-body">
                  <p className="card-text">{item.title.slice(0, 20)}</p>
                  <p className="card-text fw-lighter">
                    {item.description.slice(0, 100)}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <div>
                    <span>{item.category}</span>
                  </div>
                  <span className="text-muted">${item.price}</span>
                </div>
                ss
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed-top m-3">
        <button
          onClick={modalHander}
          type="button"
          className="btn btn-primary position-relative"
        >
          Card
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {card.length}
            <span className="visually-hidden">unread messages</span>
          </span>
        </button>
      </div>
      {isModal && (
        <div
          className="modal"
          style={{ display: 'block', background: 'rgba(0,0,0, .8)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cart</h5>
                <button
                  onClick={modalHander}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {card.map((item) => (
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded-start"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-tatle">{item.tatle}</h5>
                          <p className="card-text text-muted">
                            {item.description.slice(0, 100)}
                          </p>
                          <p className="card-text">
                            <small className="text-muted">${item.price}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  onClick={modalHander}
                  type="button"
                  className="btn btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Card
