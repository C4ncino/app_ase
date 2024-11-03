import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

interface ChainedIconsProps {
  icon: any;
  delay?: number; // Retraso entre cada icono
  duration?: number; // Duración de cada animación
}

const ChainedIcons: React.FC<ChainedIconsProps> = ({
  icon,
  delay = 300,
  duration = 750,
}) => {
  const instances = [0, 1, 2];

  const animations = useRef(instances.map(() => new Animated.Value(0))).current;
  const translateY = useRef(instances.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animatedSequence = animations.map((anim, index) =>
      Animated.sequence([
        Animated.delay(index * delay),
        Animated.parallel([
          Animated.timing(anim, {
            toValue: 1,
            duration, // Usar la duración personalizada
            useNativeDriver: true,
          }),
          Animated.timing(translateY[index], {
            toValue: -12, // Mover hacia arriba
            duration,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(anim, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(translateY[index], {
            toValue: 0, // Volver a la posición original
            duration,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Ejecuta la animación en bucle
    Animated.loop(Animated.stagger(delay, animatedSequence)).start();
  }, [delay, duration]);

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      {instances.map((_, index) => (
        <Animated.View
          key={index}
          style={{
            opacity: animations[index],
            transform: [{ translateY: translateY[index] }],
            marginHorizontal: 16,
          }}
        >
          {icon}
        </Animated.View>
      ))}
    </View>
  );
};

export default ChainedIcons;
