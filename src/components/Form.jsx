import React from "react";

export const Form = (props) => {
  const { onChange, handleSubmit, value, buttonType, youtuber, onChangeChannelId, channelId } = props;
  return (
    <>
      <form>
        <div>
          <label htmlFor="channelTitle">チャンネル名：</label>
          <input
            type="text"
            name="channelTitle"
            id="channelTitle"
            onChange={(e) => onChange(e)}
            value={value.channelTitle}
          />
        </div>
        <div>
          <label htmlFor="channelId">チャンネルID</label>
          <div>{channelId}</div>
          <input
            type="text"
            name="channelId"
            id="channelId"
            onChange={(youtuber) => onChangeChannelId(youtuber?.id.channelId)}
            value={channelId}
          />
        </div>
        <div>
          <label htmlFor="channelThumbnail">サムネイル</label>
          <input
            type="text"
            name="channelThumbnail"
            id="channelThumbnail"
            onChange={(e) => onChange(e)}
            value={value.channelThumbnail}
          />
        </div>
        <div>
          <label htmlFor="lastEditor">編集者</label>
          <input
            type="text"
            name="lastEditor"
            id="lastEditor"
            onChange={(e) => onChange(e)}
            value={value.lastEditor}
          />
        </div>
        <div>
          <label htmlFor="content">概要</label>
          <input
            type="text"
            name="content"
            id="content"
            onChange={(e) => onChange(e)}
            value={value.content}
          />
        </div>
        <input
          type="submit"
          value={buttonType}
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </>
  );
};
