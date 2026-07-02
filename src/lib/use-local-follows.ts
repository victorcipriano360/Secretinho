"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { currentUser, profiles } from "@/lib/mock-data";
import type { FollowRelationship, Profile } from "@/lib/types";

const FOLLOW_STORAGE_KEY = "secretinho.follows.v1";
const FOLLOW_EVENT = "secretinho:follows-changed";

function readSnapshot() {
  if (typeof window === "undefined") {
    return "[]";
  }

  return window.localStorage.getItem(FOLLOW_STORAGE_KEY) ?? "[]";
}

function parseFollows(rawFollows: string) {
  try {
    const parsedFollows = JSON.parse(rawFollows);

    return Array.isArray(parsedFollows) ? (parsedFollows as FollowRelationship[]) : [];
  } catch {
    return [];
  }
}

function readFollows() {
  return parseFollows(readSnapshot());
}

function writeFollows(follows: FollowRelationship[]) {
  window.localStorage.setItem(FOLLOW_STORAGE_KEY, JSON.stringify(follows));
  window.dispatchEvent(new Event(FOLLOW_EVENT));
}

function subscribeToFollows(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(FOLLOW_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(FOLLOW_EVENT, onStoreChange);
  };
}

function profileByUserId(userId: string) {
  return profiles.find((profile) => profile.userId === userId);
}

function uniqueProfiles(foundProfiles: Array<Profile | undefined>) {
  const seenUserIds = new Set<string>();

  return foundProfiles.filter((profile): profile is Profile => {
    if (!profile || seenUserIds.has(profile.userId)) {
      return false;
    }

    seenUserIds.add(profile.userId);
    return true;
  });
}

export function useLocalFollows(profileUserId?: string) {
  const rawFollows = useSyncExternalStore(subscribeToFollows, readSnapshot, () => "[]");
  const follows = useMemo(() => parseFollows(rawFollows), [rawFollows]);
  const activeProfileUserId = profileUserId ?? currentUser.id;

  const followers = useMemo(
    () =>
      uniqueProfiles(
        follows
          .filter((follow) => follow.followingUserId === activeProfileUserId)
          .map((follow) => profileByUserId(follow.followerUserId))
      ),
    [activeProfileUserId, follows]
  );

  const following = useMemo(
    () =>
      uniqueProfiles(
        follows
          .filter((follow) => follow.followerUserId === activeProfileUserId)
          .map((follow) => profileByUserId(follow.followingUserId))
      ),
    [activeProfileUserId, follows]
  );

  const isFollowing = useCallback(
    (targetUserId: string) =>
      follows.some(
        (follow) => follow.followerUserId === currentUser.id && follow.followingUserId === targetUserId
      ),
    [follows]
  );

  const toggleFollow = useCallback((targetUserId: string) => {
    if (targetUserId === currentUser.id) {
      return;
    }

    const existingFollows = readFollows();
    const alreadyFollowing = existingFollows.some(
      (follow) => follow.followerUserId === currentUser.id && follow.followingUserId === targetUserId
    );

    if (alreadyFollowing) {
      writeFollows(
        existingFollows.filter(
          (follow) => !(follow.followerUserId === currentUser.id && follow.followingUserId === targetUserId)
        )
      );
      return;
    }

    writeFollows([
      {
        followerUserId: currentUser.id,
        followingUserId: targetUserId,
        createdAt: new Date().toISOString()
      },
      ...existingFollows
    ]);
  }, []);

  return {
    followers,
    following,
    followersCount: followers.length,
    followingCount: following.length,
    isFollowing,
    toggleFollow,
    canFollow: activeProfileUserId !== currentUser.id
  };
}
