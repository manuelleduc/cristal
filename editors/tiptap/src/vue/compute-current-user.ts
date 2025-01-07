/*
 * See the LICENSE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */

import { User } from "../extensions/collaboration";
import { AuthenticationManager } from "@xwiki/cristal-authentication-api";

export async function computeCurrentUser(
  authentication?: AuthenticationManager,
): Promise<User> {
  // TODO: replace with the actual user avatar when it exists and is accessible from the authentication API.
  const noavatar =
    "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAAAAACupDjxAAAFGUlEQVR4XuzTsQqAMAxFUf//A9u36OAggoM42KxSaQno4GY73CwhaaGHBx1i5wUQIECAADssgAABAgQIECBAgAABAgQIMET5oM/bvwND7Xo9rrpyvZokWLue9rySj60+iUo4uonjvO6nmSVLx7ZM+azo1AroAV3Fmsty6kgQROf//28qC8TDPI2NH1wMBgSqnBhHBYtZjKVWV3MWwAbikKlqotUM5ruaPxid5rAZAa75kIr1Xt7sT0PHcdXjeiiAAip4gKDPwepEuyfH/7y6vQ1d7zEVK+YX/j/NVuGOBQXVH0Z7/k69cjtoGUFRhbfbsA3Nn4ECUJ/oaEGBQlUA/fRZ+J3zBIBooYpVfvSGJ2N7Fj7zUmxIqkvL9HzG11J2isfXlno0f96Iz0l8xQCGF2tIM3ZgqW4Yn6AMTp5NF2wGKTUkO6ZwqyDBFbvfmsbuGI9SZorHxiSMW6gUEDyQqYojFEhwlehnJL8KVKxXY2qExnl8xc+eB5P4jk+wdrlEZnGC4ldgD4z2BQDQuAQP7IdVsRVXPfXIjfcRJLhmT+wEABoiqIAc2ZsqsmJt2Jt1pOATe2O7QEHZsD/fkQm+sz+mgQv1FzNQBSZ4ZgamQYIKlZoZmEUJCtAwA8vAipmDVZCgKGCPEOzClf2xRZSgAHWmKZYQQRU9MQPjwIp3zMAwbJlReWV/rghMcGXsix0kSlCBMfuzDUwwyxjPEgRLTokNAIVECS74gzGZPUIT1Cutn+E8TFBFgb8/mI7ReEPsvlgnqfF55u/R92awd8M0RasUUIQNiQJT9uETiLwGBRB8kekBDhFesY7T/fgKQDT6IOc1VY8XdwsW1O97KLRWbo5NVTReUDFqXK0dZv70En/S5CxpCWd1R2iRihXAq8t1qfg0KHlevDNatwwvQ1+hywjKjrQuE1yPCp64i9+J6xDhqUI5QWdDWlvD4wDlBXVatzV8hZQVdIb7Vnr1TESluKAKROdn/oZtARRP0A2BpyN/YT/T+/9GywqKDp5P/B2rX4eeYVnB6u3Wcp1p+DGBAlpU8N267JW4G6nECyqgEAiwvrEjtlX1pjVEUAV3pt9M4LpUHxYJStAVB7vUfd1xfB+w/ILi15BOL5a8b2+WgPpnZa/Yd3Yvxj58qgAadgwhwwN7cp7ACUhQx7VvlZJbJm9zQCW/oACY3tjvxgdJslllPoYQjxALYx5e4IhmEPR2VdYeRH/s/b5cawZBj3DDXBj5qV5MrgRFl2ROw63/6kkGQRVAZw0tU8NmNHIjAsmX4LTJGyBpa0iuKVYZN/5bldGwmeVbB/VMx5iP2yiLoADYGbNjtJP2Wmb83RCsSWMEH/ftlCYmKAB0YhYkyKV4FmkViyiAwZkMitCakeulVSyAKD6MNGMM315UUoKigGJKhiVI4wYqiQm64ilIz3w1rAQCqCYJKvDMKLyTP4BCkCYIVA2jeUJyxaKyN0ZzThcEnozxPAPQFEEBDozHrgAkLcGZsQQvqRXLgSWwm6YJyrSIHsm1iqYI7lnIsE5LsCKNZVikCMqWxThod0HRC8sxTkhwwYK8JST4xYLU3ae4MpZk1llww3KGRu46C34bjeW4dhUcsTDzjoJrFuazm6B8sTDXToKiV5Zm1CnBKYvz3EnwhcXZCxTSVvBgLE2tAkBbCt5YnkqhbSue8AGs0F5wwQew7TAkbzQW59BeUA58ANcOglc+gkFrQTU+gklrwQkfwqq14JwJBI3xPwpOpY0EIp9cAAAAAElFTkSuQmCC";
  let ret = {
    name: "Anonymous",
    avatar: noavatar,
  };
  if (authentication && (await authentication.isAuthenticated())) {
    try {
      const userDetails = await authentication.getUserDetails();
      ret = {
        name: userDetails.name,
        // TODO: replace with actual user avatar.
        avatar: noavatar,
      };
    } catch (e) {
      console.error("Failed to get the user details", e);
      ret = {
        name: "Unknown",
        avatar: noavatar,
      };
    }
  }

  return ret;
}
