FROM eclipse-temurin:25-jdk AS build

WORKDIR /app

# Install small tooling, download Gradle distribution to avoid wrapper network timeouts
RUN apt-get update && apt-get install -y --no-install-recommends curl unzip ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

ARG GRADLE_VERSION=9.4.1
ENV GRADLE_HOME=/opt/gradle-${GRADLE_VERSION}
ENV PATH=${GRADLE_HOME}/bin:${PATH}

COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./
COPY src src

# Download Gradle binary with retries and increased timeouts then build without using the wrapper
RUN curl -fsSL --retry 5 --connect-timeout 60 --max-time 600 \
	-o gradle.zip https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip \
	&& unzip gradle.zip -d /opt \
	&& rm gradle.zip \
	&& chmod +x gradlew \
	&& gradle --no-daemon bootJar

FROM eclipse-temurin:25-jre

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
