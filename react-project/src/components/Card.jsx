import React from 'react'

function Card({profile}) {
  return (
    <>
        <div className="github-profile">
            <img src={profile.avatar_url} width={75} height={75}  />
            <div className="info">
                <div className="name">{profile.name ? profile.name : "No-Name"}</div>
                <div className="company">{profile.company ? profile.company : "No-Company"}</div>
            </div>
        </div>
        <hr />
    </>
  )
}

export default Card