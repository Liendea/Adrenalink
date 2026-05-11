import useProfileImageUpload from "@/hooks/useProfileImageUpload";
import "./ProfileImageUpload.scss";

export default function ProfileImageUpload() {
  const { user, inputRef, triggerFileInput, handleFileChange } =
    useProfileImageUpload();

  return (
    <div className="profile-image-upload">
      <div className="profile-image-upload__avatar" onClick={triggerFileInput}>
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="profile-image-upload__img"
          />
        ) : (
          <span className="profile-image-upload__initials">
            {user?.firstName[0]}
            {user?.lastName[0]}
          </span>
        )}
        <button className="profile-image-upload__add" type="button">
          +
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="profile-image-upload__input"
        onChange={handleFileChange}
      />
    </div>
  );
}
