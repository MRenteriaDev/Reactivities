import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profiles } from "../models/profiles";
import { store } from "./store";

export default class ProfileStore {
  profile: Profiles | null = null;
  loadingProfile = false;
  uploading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }
    return false;
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profile.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };

  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profile.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.uploading = false;
    }
  };

  setMainPhoto = async (photo: Photo) => {
    this.uploading = true;
    try {
      await agent.Profile.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find((p) => p.isMain)!.isMain = false;
          this.profile.photos.find((p) => p.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
          this.uploading = false;
        }
      });
    } catch (error) {
      runInAction(() => (this.uploading = false));
      console.log(error);
    }
  };

  deletedPhoto = async (photo: Photo) => {
    this.uploading = true;
    try {
      await agent.Profile.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos?.filter(
            (p) => p.id !== photo.id
          );
          this.uploading = false;
        }
      });
    } catch (error) {
      runInAction(() => (this.uploading = false));
      console.log(error);
    }
  };
}
