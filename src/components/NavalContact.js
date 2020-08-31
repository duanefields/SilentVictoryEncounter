import React from "react"
import { inject, observer } from "mobx-react"
import { If } from "../lib"
import css from "./NavalContact.module.css"

export default inject("appStore")(
  observer(({ appStore, contact }) => {
    return (
      <div className="card col-md-4">
        <div className={"card-block " + css.card}>
          <div className={css.sky}>
            <div className={css.name}>{contact.name}</div>
            <If cond={contact.image}>
              <img
                src={contact.image}
                className={css.image + " img-fluid"}
                alt={contact.name}
              />
            </If>
          </div>

          <div className={css.water}>
            <div className={css.damage}>{contact.damageRequired}</div>
            <div className={css.type}>
              {contact.type}
              <If cond={contact.entryType === "Escort"}>
                <span>({contact.entryType})</span>
              </If>
            </div>
            <div className={css.tonnage}>
              {contact.tonnage.toLocaleString()} tons
            </div>
            <If cond={contact.entryType === "Escort"}>
              <div>({contact.quality} Crew)</div>
            </If>
          </div>
        </div>
      </div>
    )
  })
)
