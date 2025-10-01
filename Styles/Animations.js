import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export function usePulseAnimation(toValue = 1.2, duration = 1500) {
    const anim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animation = Animated.loop(
        Animated.sequence([
            Animated.timing(anim, {
            toValue,
            duration,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(anim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
            }),
        ])
        );

        animation.start();

        return () => animation.stop();
    }, [anim, toValue, duration]);

    return anim;
    }

    export function useSlideAnimation(toValue = 10, duration = 2000) {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
        Animated.sequence([
            Animated.timing(anim, {
            toValue,
            duration,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(anim, {
            toValue: 0,
            duration,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
            }),
        ])
        );

        animation.start();

        return () => animation.stop();
    }, [anim, toValue, duration]);

    return anim;
}