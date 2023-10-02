<template>
    <div class="p-component back-1 p-4 info">
        <template v-if="contentCode === 'f'">
            <div class="explain-header">Что такое дискурсивные формулы?</div>
            <div class="ml-4">
                Короткие устойчивые ответы, которые мы используем в разговорной речи.
                <div>
                    Например &mdash; <span class="cite">Не говори!</span> <span class="cite">Как скажешь!</span> или
                    <span class="cite">Да ладно!</span>
                </div>
                <div>
                    В основном формулы выражают положительные или отрицательные реакции на слова собеседника. Можно
                    сказать, что в
                    большинстве они &mdash; синонимы Да и Нет, но с дополнительными оттенками значения.
                </div>
            </div>
        </template>
        <template v-if="contentCode === 'r'">
            <div class="explain-header">What are routines?</div>
            <div class="ml-4">
                Conversational routines (Aijmer, Coulmas) are conventional formulaic expressions that language
                speakers use in standard extralinguistic situations.
                <div>
                    Cf. <span class="cite">Bless you!</span> as a reaction to sneezing or <span class="cite">Who&apos;s
                        there?</span> as a typical answer to knocking on the door.
                </div>

            </div>
        </template>

    </div>
    <div class="p-component p-4 info">
        <div class="text-center">
            <img src="../assets/logo_pragmaticon.png" style="max-height: 10rem" />
        </div>
    </div>
    <template v-if="contentCode === 'f'">
        <div class="p-component back-2 p-4 info">
            <div class="explain-header">В чем задача Прагматикона?</div>
            <div class="ml-4">
                <div>Формулы редко попадают в словари, а угадать их значение бывает непросто.</div>
                <div>
                    Мы собрали список дискурсивных формул для русского языка и разработали формат описания, который
                    помогает
                    узнать
                    не только что значит каждая формула, но и как и когда её употреблять.
                </div>
            </div>
        </div>
    </template>
    <template v-if="contentCode === 'r'">
        <div class="p-component back-2 p-4 info">
            <div class="explain-header">The Routinicon’s goal</div>
            <div class="ml-4">
                <div> is to accumulate routines that constitute the inventory of conventional expressions in Russian
                    language and systematize them in a way that would enable their cross-linguistic comparison.</div>
            </div>
        </div>
    </template>
    <div class="p-component p-4 info text-center">
        <img src="../assets/logo_constructicon.png" style="max-height: 5rem" />
    </div>
    <div class="p-component back-3 p-4 info">
        <template v-if="contentCode === 'f'">
            <div class="explain-header">Как строится описание?</div>
            <div class="ml-4">
                <div>
                    Наша база данных &mdash; результат исследовательского проекта Школы Лингвистики НИУ ВШЭ
                    <a href="https://ling.hse.ru/" target="_blank"><i class="pi pi-external-link"></i></a>.
                    Содержательно
                    она
                    является частью Russian Constructicon
                    <a href="https://spraakbanken.gu.se/karp/#?mode=konstruktikon-rus&lang=eng" target="_blank"><i
                            class="pi pi-external-link"></i></a>.
                </div>
                <div>
                    Мы используем теоретические рамки Грамматики конструкций и Московской семантической школы и
                    анализируем
                    употребление формул, используя корпусные данные, прежде всего &mdash; Национальный корпус русского
                    языка
                    (НКРЯ)
                    <a href="https://ruscorpora.ru/" target="_blank"><i class="pi pi-external-link"></i></a>.
                </div>
            </div>
        </template>
        <template v-if="contentCode === 'r'">
            <div class="explain-header">Principles of the Description</div>
            <div class="ml-4">
                <div>
                    The present project is a natural extension of the Russian Constructicon <a
                        href="https://spraakbanken.gu.se/karp/#?mode=konstruktikon-rus&lang=eng" target="_blank"><i
                            class="pi pi-external-link"></i></a> and Pragmaticon <a
                        href="https://pragmaticon.ruscorpora.ru/" target="_blank"><i
                            class="pi pi-external-link"></i></a> projects. It inherits their approach to the
                    systematization of phraseological units as well as their methods of data collection; the analysis
                    draws upon the material of the Russian National Corpus. At the same time, the current project
                    focuses on a fundamentally different domain and hence offers a radically new structure of linguistic
                    annotation.
                </div>
            </div>
        </template>
    </div>
    <div class="p-component p-4 info text-center">
        <img src="../assets/logo_hse.png" style="max-height: 8rem" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import store from '../store';
const contentCode = store.state.config.settings.mode;
</script>